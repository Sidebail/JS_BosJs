const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    health: Number,
    attack: Number,
    armor: Number,
    level: Number,
    pierce: Number,
    animIdle: String,
    animAttack: String,
    animDefend: String
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

/*
const classSchema = new Schema({
    teacher: String,
    courseCode: String,
    title: String
});

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});


*/