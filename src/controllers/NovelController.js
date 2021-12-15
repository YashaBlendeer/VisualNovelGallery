Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Novel = require('../models/Novel');

var _Novel2 = _interopRequireDefault(_Novel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NovelController = function () {
    function NovelController() {
        _classCallCheck(this, NovelController);
    }

    _createClass(NovelController, [{
        key: 'index',
        value: function index(req, res) {
            _Novel2.default.find().then(function (err, novels) {
                if (err) {
                    res.send(err);
                }
                res.json(novels);
            });
        }
    }, {
        key: 'create',
        value: function create(req, res) {
            var data = req.body;
            var novel = new _Novel2.default({
                _id: data._id,
                title: data.title,
                pages: data.pages });
            novel.save().then(function () {
                res.send({ status: 'ok' });
            });
        }
    }, {
        key: 'read',
        value: function read(req, res) {
            _Novel2.default.findOne({ _id: req.params.id }).then(function (novel) {
                if (!novel) {
                    res.send({ error: 'not found' });
                } else {
                    res.json(novel);
                }
            });
        }
    }, {
        key: 'update',
        value: function update(req, res) {
            _Novel2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ status: 'updated' });
            });
        }
    }, {
        key: 'delete',
        value: function _delete(req, res) {
            _Novel2.default.findByIdAndDelete({
                _id: req.params.id
            }).then(function (novel) {
                if (novel) {
                    res.json({ status: 'deleted' });
                } else {
                    res.json({ status: 'error' });
                }
            });
        }
    }]);

    return NovelController;
}();

exports.default = NovelController;