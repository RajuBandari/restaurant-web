const router = require('express').Router();
const { restaurant } = require('../../models');

const INTERNAL_SERVER_ERROR = "Something went wrong on server";
const SUCCESS = "Request successful";
const FAILURE = "Request failed";

// GET - /restaurants
router.get('/', async (req, res) => {
    try {
        const data = await restaurant.get();
        res.status(200).json({
            message: SUCCESS,
            data
        });
    } catch(error) {
        if(error.code) {
            res.status(error.code).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message:  FAILURE
            })
        }
    }
});

// POST - /restaurants
router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if(!name || !description) {
            res.status(400).json({
                error: "Invalid Restaurant information"
            });
        } else {
            const data = await restaurant.post(req.body);
            res.status(201).json({
                message: SUCCESS,
                data
            })
        }
    } catch(error) {
        console.log("get_restaurants_error:", error.message)
        if(error.code) {
            res.status(error.code).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message:  FAILURE
            })
        } 
    }
});

// DELETE - restaurants/{id}
router.delete('/:id', async (req, res, next) => {
    try {
        await restaurant.delete(req.params);
        res.status(200).json({
            message: SUCCESS
        })
    } catch(error) {
        if(error.code) {
            res.status(error.code).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message:  FAILURE
            })
        }
    }
});

module.exports = router;