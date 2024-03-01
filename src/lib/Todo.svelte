<div class="todo-container">
  <div class="priorities">
    <div class="priority urgency">3</div>
    <div class="priority importance">3</div>
    <div class="priority time">5</div>
  </div>
  <div class="description">THIS IS MY DESCRIPTION</div>
  <p>Tags:</p>
  <ul>
    <li>Tag1</li>
    <li>Tag2</li>
    <li>Tag3</li>
  </ul>
</div>

<style>
  .todo-container {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    align-items: center;
  }
  .priorities{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .priority{
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
  }
</style>