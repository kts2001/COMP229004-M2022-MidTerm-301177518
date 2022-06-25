// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = function(req, res, next) {  
    CarModel.find((err, carsList) => {
        //console.log(carList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('cars/list', {
                title: 'Cars List', 
                CarsList: carsList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


// Gets a car by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    CarModel.findById(id, (err, carToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('cars/details', {
                title: 'Car Details', 
                car: carToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    res.render('cars/add_edit', { title: 'Add Car', car: 'None' })
    
    // ADD YOUR CODE HERE        

}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = (req, res, next) => {
    let newCar = CarModel({
        'make': req.body.make,
        'model': req.body.model,
        'year': req.body.year,
        'kilometers': req.body.kilometers,
        'doors': req.body.doors,
        'seats': req.body.seats,
        'color': req.body.color,
        'price': req.body.price
    })

    CarModel.create(newCar, (err) => {
        if (err) 
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            // refresh the car list
            res.redirect('/cars/list')
        }
    })
    // ADD YOUR CODE HERE

}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    const carId = req.params.id

    CarModel.findById(carId, (err, car) => {
        if (err) {
            console.log(err)
            res.end(err)
        } else {
            res.render('cars/add_edit', { title: 'Edit Car', car: car })
        }
    })
        
    // ADD YOUR CODE HERE
    
}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = (req, res, next) => {
    const carId = req.params.id

    let updatedCar = CarModel({
        '_id': carId,
        'make': req.body.make,
        'model': req.body.model,
        'year': req.body.year,
        'kilometers': req.body.kilometers,
        'doors': req.body.doors,
        'seats': req.body.seats,
        'color': req.body.color,
        'price': req.body.price
    })

    CarModel.updateOne({ _id: carId }, updatedCar, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        } else {
            // refresh
            res.redirect('/cars/list')
        }
    })
    // ADD YOUR CODE HERE
    
}

// Deletes a car based on its id.
module.exports.performDelete = (req, res, next) => {
    const carId = req.params.id

    CarModel.findById(carId, (err, car) => {
        if (err)
        {
            console.log(err)
            res.end(err)
        } else {
            CarModel.remove({ _id: carId }, (err) => {
                if (err)
                {
                    console.log(err)
                    res.end(err)
                }
                else
                {
                    // refresh
                    res.redirect('/cars/list')
                }
            })            
        }
    })
    // ADD YOUR CODE HERE

}