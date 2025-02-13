const express = require('express');
const Employee = require('../models/employee')
const router = express.Router(); 

//cadastro do FUNCIONARIO
router.post('/register', async(req,res) => {
    try{
        const employee = new Employee (req.body);
        await employee.save();
        res.status(201).send(employee);
    } catch (error){
        res.status(400).send(error);
    }
});

//Listar funcionarios
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;