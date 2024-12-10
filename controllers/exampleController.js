const examples = require("../models/examplesData");
const CustomError = require("../classes/CustomError");

function index(req, res) {
    const response = {
        totalCount: examples.length,
        data: [...examples],
    };
    res.json(response);
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const item = examples.find((item) => item.id === id);
    if (!item) {
        throw new CustomError("L'elemento non esiste", 404);
    }
    res.json({ success: true, item });
}

function store(req, res) {
    let newId = 0;
    for (let i = 0; i < examples.length; i++) {
        if (examples[i].id > newId) {
            newId = examples[i].id;
        }
    }
    newId += 1;

    // new data is in req.body
    const newItem = {
        id: newId,
        title: req.body.title,
    };

    examples.push(newItem);
    res.status(201).json(newItem);
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const item = examples.find((item) => item.id === id);
    if (!item) {
        throw new CustomError("L'elemento non esiste", 404);
    }

    // Update fields, excluding "id"
    for (const key in item) {
        if (key !== "id") {
            item[key] = req.body[key];
        }
    }

    res.json(item);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = examples.findIndex((item) => item.id === id);
    if (index !== -1) {
        examples.splice(index, 1);
        res.sendStatus(204);
    } else {
        throw new CustomError("L'elemento non esiste", 404);
    }
}

module.exports = { index, show, store, update, destroy };