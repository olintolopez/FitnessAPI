'use strict'
import db from './database'

class ExercisesController {
    static index(req, res){
        var sql = "select * from exercise"
        db.all(sql, (err, data) => {
            if (err) {
              res.status(500).json({'error': err.message});
              return;
            }
            res.json({
                data
            })
          });
    }

    static store(req, res){
        const { title, description, img, leftColor, rightColor } = req.body
        const SQL = 'INSERT INTO exercise (title, description, img, leftColor, rightColor) VALUES (?,?,?,?,?)'
        const params = [title, description, img, leftColor, rightColor]        
        db.run(SQL, params, function (err) {
            if (err){
                res.status(500).json({'error': err.message})
                return;
            }
            req.body.id = this.lastID
            res.json({
                'data': req.body
            })
        })
    }

    static details(req, res){
        var sql = "select * from exercise where id = ?"
        
        db.get(sql, req.params.id, (err, data) => {
            if (err) {
              res.status(500).json({'error': err.message});
              return;
            }
            res.json({
                data
            })
        });
    }
}

export default ExercisesController
