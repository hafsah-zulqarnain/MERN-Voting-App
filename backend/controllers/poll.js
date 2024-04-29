const db = require('../models');
const user = require('../models/user');
const { populate } = require('../models/user');

exports.showPolls = async(req, res, next) =>{
   try {
    const polls = await db.Poll.find().populate('user',['cnic', 'id']);
    res.status(200).json(polls)
   } catch (err) {
    err.status = 400
    next(err)
   } 
}
exports.usersPolls = async(req, res, next) =>{
    try {
        const {id}  = req.decoded
        const user = await db.User.findById(id)
        .populate('polls')

        res.status(200).json(user.polls)
    } catch (err) {
        err.status = 400
        next(err)
    }

}
exports.createPoll = async(req, res, next) =>{
    try {
        console.log(req.decoded)
        const {id} = req.decoded
        console.log(id)
        const user = await db.User.findById(id)
        if( user.cnic != 'admin')
        {
          throw new Error('Access Denied')
        }
        const {halka, options} =req.body
        
        const poll = await db.Poll.create({
            halka,
            user,
            options: options.map( option =>({ option, votes: 0}))
        })
        console.log(options)
        user.polls.push(poll._id)
        await user.save()
        // Here i made changes for access only to admin
        res.status(201).json({...poll._doc, user: 'admin'})
        // here before user: user._id
        
    } catch (err) {
        err.status = 400
        next(err)
    }
}

exports.getPoll = async(req, res, next) =>{
    try {
        const {id} =req.params
        const poll = await db.Poll.findById(id)
        .populate('user',['cnic', 'id'])


        if(!poll)
            throw new Error('No poll found')

    res.status(200).json(poll)
        
    } catch (err) {
        err.status = 400
        next (err)
    }
}

exports.deletePolls = async(req, res, next) =>
{
    try {
        const {id: pollId} =req.params
       // const {id: userId} = req.decoded
        const {id: userId} = req.decoded
        const poll = await db.Poll.findById(pollId);
        if(!poll)
        {
            throw new Error('No such poll')
        }
        if(poll.user.toString() != userId)
        {
            throw new Error('Unauthorized Access')
        }
    await poll.deleteOne()
    res.status(202).json(poll)
    } catch (err) {
        err.status=400
        next(err)
        
    }
}

exports.vote = async (req, res, next) => {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;
    const { answer } = req.body;

    const user = await db.User.findById(userId);
    

    const userHalka = user.halka;
    const userRegistered= user.isRegistered
    // if(!user.isRegistered)
    // {
    //   throw new Error('You cannot vote as you are not registered');
    // }
    try {
      if(userRegistered)
      {
      if (answer) {
        const poll = await db.Poll.findById(pollId);
        if (!poll) throw new Error('No poll found');
        console.log(poll)
        const candidateHalka = poll.halka;
        console.log(userHalka,candidateHalka)
        if (candidateHalka !== userHalka) {
            throw new Error('You can only vote for candidates in your own constituency');
        }
        const vote = poll.options.map(
          option =>
            option.option === answer
              ? {
                  option: option.option,
                  _id: option._id,
                  votes: option.votes + 1,
                }
              : option,
        );
  
        console.log('VOTE: USERID ', userId);
        console.log('VOTE: poll.voted ', poll.voted);
        console.log(
          'VOTE: vote filter',
          poll.voted.filter(user => user.toString() === userId).length,
        );
  
        if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
          poll.voted.push(userId);
          poll.options = vote;
          await poll.save();
  
          return res.status(202).json(poll);
        } else {
          throw new Error('Already voted');
        }
      } else {
        throw new Error('No Answer Provided');
      }
    }
    else{
      throw new Error('Not registered');
    }
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  };
  
  exports.getAllUsers = async (req, res, next) => {
    try {
        console.log(req.decoded);
        const { id } = req.decoded;
        console.log(id)
        const adminUser = await db.User.findById(id);
        
        if (adminUser.cnic !== "admin") {
            return res.status(403).json({ message: "Access denied. Only admins can retrieve all users." });
        }

        const users = await db.User.find();

        res.status(200).json(users);
    } catch (err) {
        err.status = 400;
        next(err);
    }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
      console.log(req.decoded);
      const { id } = req.decoded;

      const adminUser = await db.User.findById(id);
    console.log(adminUser)
      if (adminUser.cnic !== "admin") {
          return res.status(403).json({ message: "Access denied. Only admins can update user status." });
      }

      // Update user status fields
      const { uid, isRegistered, approved } = req.body;
      console.log(uid, isRegistered, approved)
        const userToUpdate = await db.User.findById(uid);
        console.log(userToUpdate._id, userToUpdate.isRegistered, userToUpdate.approved, userToUpdate.role)
        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found." });
        }
        if (userToUpdate.role === "voter" && isRegistered===true) {
          userToUpdate.isRegistered = isRegistered;
        }else {
          throw new Error("Not a voter");
        } 

        if (userToUpdate.isCandidate === true && approved===true) 
            userToUpdate.approved = approved;
    
      await userToUpdate.save();

      res.status(200).json({ message: "User status updated successfully." });
  } catch (err) {
      err.status = 400;
      next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
      const { id: loggedInUserId } = req.decoded;
      const profileDataToUpdate = req.body;

      // Find the user to update
      const userToUpdate = await db.User.findById(loggedInUserId);
      if (!userToUpdate) {
          return res.status(404).json({ message: "User not found." });
      }

      // Update profile fields
      for (const field in profileDataToUpdate) {
          // Only update fields that are allowed to be updated
          if (field === "halka" || field === "role" || field === "isCandidate" ) {
              userToUpdate[field] = profileDataToUpdate[field];
          }
      }

      await userToUpdate.save();

      res.status(200).json({ message: "User profile updated successfully." });
  } catch (err) {
      err.status = 400;
      next(err);
  }
};
