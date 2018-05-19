module.exports = (app) => {
  const Tasks = app.models.task;

  const controller = {};

  controller.listTasks = (req, res) => {
    Tasks.find().exec()
      .then(task => res.json(task))
      .catch(err => new Error(`Error in list tasks: ${err}`));
  };

  controller.saveTask = (req, res) => {
    const { params: { id } } = req;
    const { body: { activity, done } } = req;

    const data = {
      activity,
      done,
    };

    if (id) {
      Tasks.update({ _id: id }, { $set: data })
      .catch(err => new Error(`Error in edit current Task: ${err}`));
    } else {
      Tasks.create(data)
      .then(task => res.json(task))
      .catch(err => new Error(`Error in create a new Task: ${err}`));
    }
  };

  controller.getTaskById = (req, res) => {
    const { params: { id } } = req;
    Tasks.findById(id)
      .then(task => res.json(task))
      .catch(err => new Error(`Error in find Task By Id: ${err}`));
  };

  controller.removeTask = (req, res) => {
    const { params: { id } } = req;
    Tasks.findByIdAndRemove(id)
    .then(task => res.json(task))
    .catch(err => new Error(`Error in Remove Task By Id: ${err}`));
  };


  return controller;
};
