// Create web server for comments
// (C) 2018 - Rolf Michelsen
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Read comments from file and parse as JSON
function readComments() {
    const filename = path.join(__dirname, "comments.json");
    const json = fs.readFileSync(filename, "utf-8");
    return JSON.parse(json);
}

// Write comments to file as JSON
function writeComments(comments) {
    const filename = path.join(__dirname, "comments.json");
    const json = JSON.stringify(comments, null, 2);
    fs.writeFileSync(filename, json, "utf-8");
}

// Return the next available comment id
function nextCommentId(comments) {
    const ids = comments.map(c => c.id);
    return Math.max(...ids) + 1;
}

// Return the comment with the specified id, or null if not found
function findCommentById(comments, id) {
    const comment = comments.filter(c => c.id === id);
    return comment.length === 1 ? comment[0] : null;
}

// Create a new comment
function createComment(comments, text) {
    const id = nextCommentId(comments);
    const comment = { id: id, text: text };
    comments.push(comment);
    return comment;
}

// Delete the specified comment
function deleteComment(comments, id) {
    const index = comments.findIndex(c => c.id === id);
    if (index < 0) {
        return false;
    }
    comments.splice(index, 1);
    return true;
}

// Update the specified comment
function updateComment(comments, id, text) {
    const comment = findCommentById(comments, id);
    if (comment === null) {
        return false;
    }
    comment.text = text;
    return true;
}

// Return a list of all comments
function listComments(comments) {
    return comments;
}