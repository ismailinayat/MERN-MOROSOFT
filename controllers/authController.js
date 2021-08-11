import jwt  from 'jsonwebtoken';
import cookie from 'cookie';
import {promisify} from 'util';                        // util is a node module and out of it we are extracting the 'promisify' function which is used to work with promises.
import User  from './../models/userModel.js';
import catchAsync  from './../utils/catchAsync.js';
import AppError  from './../utils/appError.js';


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('todos');

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie(
          "jwt", token, {
          //httpOnly: true,
          //sameSite: 'None',
          //secure: true,
          maxAge: 60 * 60 *60*60,
    })

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    //.create is a shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs. Triggers the save() hook.
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,

  });
  newUser.password = undefined;                     // We are simply removing the password from the 'newUser' document which we will send back to the user when they signup. So it is risky that we send the
                                                    // password in the returned document. And because password will be already saved in the database because we are using the 'create' method above so we will 
                                                    // simply set the password field to 'undefined'.

  createAndSendToken(newUser, 200, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password'); // Because we have set 'select' to false in 'userSchema' therefore we have to specifically select 'password' here.

  if (!user || !(await user.correctPassword(password, user.password))) {
    // This correctPassword is an instance method defined in userModel on 'userSchema'. Because instance methods are avaiable on all the documents onto which they are defined and because we have defined
    // 'correctPassword' onto the 'userSchema' and also the 'user' is the document of the 'userSchema', we can apply 'correctPassword' onto the 'user' document like this.
    return next(new AppError('Incorrect email or password', 401));
  }

  createAndSendToken(user, 200, res);
});

const logout = (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({status: 'success'})
}

const protect = catchAsync(async (req, res, next) => {

  // 1) Check if the token was sent along with the request

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token)
    return next(
      new AppError(
        'You are not logged in! Please login to access the requested page.',
        401
      )
    );

  // 2) Verify that the token is valid and to which user it belongs to. Now originally we used the 'promisify' from the 'util' package that comes built in with 'node', in order to use async await to deal with
  //    jwt.verify(), however it was giving an error message. So I had to convert it to the 'callback' method.


  const decoded = jwt.verify(token, process.env.JWT_SECRET, function (err,decoded) {

    if (err) {
      console.log('there is an error')
      return next(new AppError('Your token is not valid. Please send the correct token to access the requested page'))
    }
    return decoded
  });  
  
  //jwt.verify will return an object containing user id, iat and exp, and we have saved these in the 'decoded' object and returned it. 


  // 3) Check if the user to which this token belongs to still exists in the database

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError(
        'The user belonging to this token has deleted his account! Signup again to get the access to the requested route.',
        401
      )
    );
  }

  req.user = freshUser;
  next();
});

const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const freshUser = await User.findById(decoded.id);


      if (!freshUser) {

        res.status(200).json({
          data: {
            message: "No user found for the provided token."
          }
        })
      }


      //console.log(freshUser)
      res.status(200).json({
        status: 'success',
  
        data: {
          freshUser
        }
      });
      
    } catch (err) {
      return new AppError('Something went wrong while checking if the user is logged in or not.')
    }
  }
  else {
    res.status(200).json({
      data: {
        message: "No valid cookie found"
      }
    })
  }
};



export { signup, login, logout, protect, isLoggedIn, getUser}

/**
 *  protect,
 */