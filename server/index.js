
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const ProgramModel = require('./models/Program');
const stripe = require('stripe')('sk_test_51PNSST2KpyYZmvZELH7NIKMo4zOPqLuCKRWE1pfg87d3q5lHOyoW94v4lHEMuxCytU4A8PyEZtSP8y79udCAB5xS00iYwURNL3');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://nch0123ca:6vRwCS5T9ZpLR2ab@coachnpayroll.1zfwp8k.mongodb.net/users");




app.post('/create-checkout-session', async (req, res) => {
  const { programId, discountCode } = req.body;

  try {
    const program = await ProgramModel.findById(programId);

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: {
            name: program.name,
            description: `${program.sport} at ${program.place}`,
          },
          unit_amount: program.fees * 100,
        },
        quantity: 1,
      }],
      allow_promotion_codes: true, // Enable usage of promotion codes
      promotion_code: discountCode, // Pass the discount code
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// User routes
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
});

// Program routes
app.get('/programs', (req, res) => {
    ProgramModel.find({})
        .then(programs => res.json(programs))
        .catch(err => res.json(err))
});

app.get('/programs/:id', (req, res) => {
    const id = req.params.id;
    ProgramModel.findById({ _id: id })
        .then(program => res.json(program))
        .catch(err => res.json(err))
});

app.post('/programs', (req, res) => {
    ProgramModel.create(req.body)
        .then(program => res.json(program))
        .catch(err => res.json(err))
});

app.put('/programs/:id', (req, res) => {
    const id = req.params.id;
    ProgramModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then(program => res.json(program))
        .catch(err => res.json(err))
});

app.delete('/programs/:id', (req, res) => {
    const id = req.params.id;
    ProgramModel.findByIdAndDelete({ _id: id })
        .then(program => res.json(program))
        .catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log("Server is Running")
});
