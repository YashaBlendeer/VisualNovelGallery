Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PagesSchema = new _mongoose.Schema({
    bg: String,
    img: String,
    name: String,
    msg: String,
    pos: Number
}, {
    timestamps: true
});
var NovelSchema = new _mongoose.Schema({
    _id: Number,
    title: String,
    pages: [PagesSchema]
});
var Novel = _mongoose2.default.model('Novel', NovelSchema);

exports.default = Novel;