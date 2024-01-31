<!-- 
// app.js
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
Update Operation (PUT)
javascript
Copy code
// app.js
app.put('/todos/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
Delete Operation (DELETE)
javascript
Copy code
// app.js
app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 -->

<!-- 

# deploy to render:

npm uninstall --save @types/cookie-parser@^1.4.6
npm uninstall --save @types/cors@^2.8.17
npm uninstall --save @types/express@^4.17.21
npm uninstall --save @types/jsonwebtoken@^9.0.5
npm uninstall --save @types/node@^20.11.13
npm uninstall --save @types/otp-generator@^4.0.2

npm install --save @types/cookie-parser
npm install --save @types/cors
npm install --save @types/express
npm install --save @types/jsonwebtoken
npm install --save @types/node
npm install --save @types/otp-generator

 -->