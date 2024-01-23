const express = require("express");
const router = express.Router();
const Friend = require("../models/friends.js");
const {
  calculateFriendsExpense,
  getFreinds,
} = require("../JS/friendsExpense.js");

router.get("/", async (req, res) => {
  try {
    const userLoans = await Friend.findOne({ user: req.user.id }).populate(
      "user"
    );
    const allFriendsExpense = calculateFriendsExpense(userLoans);
    const friends = getFreinds(userLoans);
    res.json({
      loans: userLoans.friends,
      totalGiveOrTake: allFriendsExpense,
      user: req.user.username,
      friends: friends,
      items: [],
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "some error" });
  }
});

router.post("/add", async (req, res) => {
  const added_date = req.body.date;
  const loan_type = req.body.loan_type;
  const amount = req.body.amount;
  const reason = req.body.reason;

  let person = req.body.person;
  if (person === "new") {
    person = req.body.newPerson;
  }

  const friend = {
    date: added_date,
    type: loan_type,
    name: person,
    reason: reason,
    amount: amount,
  };

  try {
    const userLoans = await Friend.findOne({ user: req.user.id }).populate(
      "user"
    );
    const friends = userLoans.friends;
    friends.push(friend);
    await userLoans.save();
    res.json({ message: "Succesfully added" });
  } catch (err) {
    console.log(err);
    res.json({ message: "some error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const loanId = req.body.loanid;
    const userLoans = await Friend.findOne({ user: req.user.id }).populate(
      "user"
    );

    const initialFriendsLength = userLoans.friends.length;

    // Use filter to create a new array without the friend to be deleted
    userLoans.friends = userLoans.friends.filter(
      (friend) => friend._id.toString() !== loanId
    );

    const finalFriendsLength = userLoans.friends.length;

    // Check if any data is actually deleted
    const isDeleted = initialFriendsLength !== finalFriendsLength;

    if (isDeleted) {
      await userLoans.save();
      res.json({ message: "Successfully deleted" });
    } else {
      res.json({ message: "Friend not found or already deleted" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Some error!" });
  }
});

module.exports = router;
