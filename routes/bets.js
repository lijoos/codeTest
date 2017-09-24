var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://lijo:lijo@ds141524.mlab.com:41524/dbbetrisk', ['betHistory']);

// Get All bet History
router.get('/betsettled', function(req, res, next){
    db.betHistory.find(function(err, betsettled){
        if(err){
            res.send(err);
        }
        res.json(betsettled);
    });
});
// Get customer based Bet History
router.get('/betsettled/:id', function(req, res, next){
  console.log(req.params.id);
  var v=req.params.id;
    db.betHistory.find({customer:Number(v)}, function(err, betsettled){
        if(err){
            res.send(err);
        }
        res.json(betsettled);
    });
});

router.get('/bet', function(req, res, next){
  console.log(req.params.id);
  var v=req.params.id;
    db.betHistory.find({customer:Number(v)}, function(err, betsettled){
        if(err){
            res.send(err);
        }
        res.json(betsettled);
    });
});
//get win pecentage of settled bets
router.get('/winpercentage', function (req, res) {
    console.log("sadsa");
      db.betHistory.aggregate([
          {
    $group: {
      _id: '$customer',
      
      total: { $sum: '$win' },
      totalnotwon: {
        $sum: { $cond: [{ $lte: ['$win', 0] }, 1, 0] },
      },
      totalwon: {
        $sum: { $cond: [{ $gt: ['$win', 0] }, 1, 0] },
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
       _id:0,
       customer: "$_id",
        winPer: {
      $floor:{$multiply:[{ $divide:[100,'$total']},'$totalwon']}
      }
    }

  },
     { $sort : { customer : 1 } }
      ], function (err, result) {
        //console.log(err);
        res.json(result);
    });
});
//get average stake and win percentage of each customer
router.get('/customerRisk', function (req, res) {
    console.log("sadsa");
      db.betHistory.aggregate([
          {
    $group: {
      _id: '$customer',
      
      total: { $sum: '$win' },
      totalnotwon: {
        $sum: { $cond: [{ $lte: ['$win', 0] }, 1, 0] },
      },
      totalwon: {
        $sum: { $cond: [{ $gt: ['$win', 0] }, 1, 0] },
      },
       avgStake: {
            $avg: "$stake"
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
       _id:0,
       customer: "$_id",
       avgStake: 1,
        winPer: {
      $floor:{$multiply:[{ $divide:[100,'$total']},'$totalwon']}
      }
    }

  },
     { $sort : { customer : 1 } }
      ], function (err, result) {
        //console.log(err);
        res.json(result);
    });
});
// Get All bet History
router.get('/betunsettled', function(req, res, next){
    db.betdata.find(function(err, betdata){
        if(err){
            res.send(err);
        }
        res.json(betdata);
    });
});
// Get customer based Bet History
router.get('/betunsettled/:id', function(req, res, next){
  console.log(req.params.id);
  var v=req.params.id;
    db.betdata.find({customer:Number(v)}, function(err, betdata){
        if(err){
            res.send(err);
        }
        res.json(betdata);
    });
});/*
router.get('/totalwin',function(req,res){
 
    db.betHistory.aggregate([
    
      
      {$lookup:
        {
          from: "betdata",
          localField: "customer",
          foreignField: "customer",
          as: "inventory_docs"
        }
   },
   { "$unwind": "$inventory_docs" },
    ],function (err, result) {
        console.log(result);
        res.json(result);
    });
});


router.get('/totalwin1', function (req, res) {
    var ids= db.betdata.find( {  },{customer:1, _id:0});
    console.log(ids);
    db.betdata.find(function(err, betdata){
        if(err){
            res.send(err);
        }
        res.json(betdata);
    });
});
*/

module.exports = router;
