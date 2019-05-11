'use strict';

// Import the Express server module
const express = require('express');
const commentTable = require('../../database/tables/comment-table');
const postTable = require('../../database/tables/post-table');

// Create our router for our comments API
const commentRouter = express.Router();

// Get all comments
commentRouter.get('/',async (req, res,next) => {
    try {
       const id =req.baseUrl.split("/")[3]
      const comments = await commentTable.getRows(id);
      return res.json(comments); 
    } catch (err) {
      return next(err);
    }
  });

// Create a comment
commentRouter.post('/', async(req, res,next) => {
    try{
        const postid =req.baseUrl.split("/")[3]
        const user = await postTable.getRow(postid)
        const userid = user.user_id
        const comment = await commentTable.createRow(req.body,userid,postid);
        return res.json(comment);

    }catch(err){
        return next(err);
    }
});

// Get one specific post by id
commentRouter.get('/:commentid', async(req,res,next) => {
    try{
        const comment = await commentTable.getRow(req.params.commentid);
        return res.json(comment)
    }
    catch(err){
        return next(err)
    }
    

});


// Modify one specific post by id
commentRouter.put('/:commentid', async(req, res,next) => {
    try{
        const comment = await commentTable.updateRow(req.params.commentid,req.body);
        return res.json(comment)

    }catch(err){
        return next(err)
    }
});


// Delete one specific post by id
commentRouter.delete('/:commentid', async(req, res,next) => {
    try{
        const comment = await commentTable.deleteRow(req.params.commentid);
        return res.json(comment);
    }catch(err){
        return next(err)
    }
});


// Export our post router
module.exports = commentRouter;
