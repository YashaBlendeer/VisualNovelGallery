'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _mongoose = require('mongoose');

const _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const PagesSchema = new _mongoose.Schema(
  {
    bg: String,
    img: String,
    name: String,
    msg: String,
    pos: Number,
  },
  {
    timestamps: true,
  }
);
const NovelSchema = new _mongoose.Schema({
  _id: Number,
  title: String,
  pages: [PagesSchema],
});
const Novel = _mongoose2.default.model('Novel', NovelSchema);

exports.default = Novel;
