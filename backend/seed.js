require('dotenv').config()
const { response } = require('express')
const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB)

const db = require('./models')

const users =[
    {cnic: 'cnic', password:'password',halka: 'someValue'},
    {cnic: 'hafsah', password:'password',halka: 'someValue'},
]

const polls= [
    {
        question: 'Which party you want to vote to?',
        options: ['PTI','PML-N','PPP']
    },
    {
        question: 'Which candidate you want to vote to?',
        options: ['a','b','c','d']
    }
]

const seed= async () =>
{
    try {
        await db.User.deleteMany();
        console.log('Drop all users')

        await db.Poll.deleteMany()
        console.log('Drop all polls')

        await Promise.all(
            users.map(async user=> 
                {
                    const data= await db.User.create(user)
                    await data.save()
                })
        )

        console.log('CREATED USERS', JSON.stringify(users))
            
        await Promise.all(
            polls.map(async poll=>
            {
                poll.options= poll.options.map(option => (
                    {
                        option, votes: 0
                    }
                ))
                const data= await db.Poll.create(poll)
                const user =await db.User.findOne({ cnic: 'cnic'})
                data.user = user
                user.polls.push(data._id)
                await user.save()
                await data.save()

            })
        )
        console.log('CREATED POLLS', JSON.stringify(polls)) 
    } catch (err) {
        console.error(err)
    }
}

seed()