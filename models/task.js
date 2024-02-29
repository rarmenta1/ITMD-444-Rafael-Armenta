const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT DEFAULT 'todo' CHECK(status IN ('todo', 'wip', 'done'))
        )
    `);
});

class Task {
    static all(callback) {
        db.all('SELECT * FROM tasks', (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }

    static create(newTask, callback) {
        db.run('INSERT INTO tasks (title, description) VALUES (?, ?)', [newTask.title, newTask.description], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID, ...newTask, message: 'Task created' });
        });
    }

    static update(id, updatedTask, callback) {
        db.run('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [updatedTask.title, updatedTask.description, updatedTask.status, id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id, ...updatedTask, message: 'Task updated' });
        });
    }

    static delete(id, callback) {
        db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { success: true, message: 'Task deleted' });
        });
    }
}

module.exports = Task;
