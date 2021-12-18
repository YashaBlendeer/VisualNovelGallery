const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Score = require('../models/Score')
const Category = require('../models/Category')
const User = require('../models/User')
const LeaderBoard = require('../models/LeaderBoard')

// @desc    Get scores
// @route   GET /api/v1/scores
// @access  Private/Admin
exports.getScores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single score
// @route   GET /api/v1/score/:id/
// @access  Private/Admin
exports.getScore = asyncHandler(async (req, res, next) => {
  const score = await Score.findById(req.params.id)

  if (!score) {
    return next(new ErrorResponse(`No score with that id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: score })
})

// @desc    Get single score
// @route   GET /api/v1/score/:id/category
// @access  Private/Admin
exports.getScoreByCategory = asyncHandler(async (req, res, next) => {
  const score = await Score.findOne({
    category: req.params.id,
    user: req.user.id,
  })

  if (!score) {
    return res.status(200).json({ success: true, data: { score: 0 } })
  }

  res.status(200).json({ success: true, data: score })
})

// @desc    Create score
// @route   POST /api/v1/scores/
// @access  Private/Admin
exports.createScore = asyncHandler(async (req, res, next) => {


  if (!req.body.category) {
    return next(new ErrorResponse(`Category is required`, 404))
  }

  const category = await Category.findById(req.body.category)

  if (!category) {
    return next(
      new ErrorResponse(`No category with that id of ${req.body.category}`)
    )
  }

  let score = await Score.findOne({ category, user: req.user.id })

  req.body.score = req.body.score ? req.body.score : 0

  if (score.score < parseInt(req.body.score)) {
    score = await Score.findOneAndUpdate(
      { category, user: req.user.id },
      { score: req.body.score },
      { upsert: true, new: true, runValidators: true }
    )

    if (!score) {
      return next(new ErrorResponse(`Something went wrong`, 500))
    }
  }
  const scores = await Score.find({ user: req.user.id })
  let totalScore = 0

  if (scores) {
    scores.forEach((score) => {
      totalScore += score.score
    })
  }

  await LeaderBoard.findOneAndUpdate(
    { user: req.user.id },
    { totalScore },
    { upsert: true, new: true, runValidators: true }
  )

  res.status(200).json({ success: true, data: score })
})

// @desc    Delete score
// @route   DELETE /api/v1/scores/:id
// @access  Private/Admin
exports.deleteScore = asyncHandler(async (req, res, next) => {
  const score = await Score.findByIdAndDelete(req.params.id)

  if (!score) {
    return next(new ErrorResponse(`No score with id of ${req.params.id}`))
  }

  res.status(200).json({ success: true, data: score })
})
