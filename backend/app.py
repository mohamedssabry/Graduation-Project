from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/schedule_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False)
    group_level = db.Column(db.String(100))
    university = db.Column(db.String(100))
    faculty = db.Column(db.String(100))
    year = db.Column(db.String(50))
    semester = db.Column(db.String(50))
    work_hour_from = db.Column(db.String(20))
    work_hour_to = db.Column(db.String(20))
    full_data = db.Column(db.Text)

# حفظ أو تعديل جدول
@app.route('/save-schedule', methods=['POST'])
def save_schedule():
    try:
        data = request.json

        if not data or not data.get('groups'):
            return jsonify({"message": "❌ البيانات غير مكتملة أو لا تحتوي على مجموعات!"}), 400

        first_group_name = data['groups'][0]['groupName'] if data['groups'] else "Unnamed Group"
        group_level = data.get('groupLevel', '')

        existing_schedule = Schedule.query.filter_by(group_name=first_group_name, group_level=group_level).first()

        if existing_schedule:
            # تحديث الجدول
            existing_schedule.university = data.get('university', '')
            existing_schedule.faculty = data.get('specialization', '')
            existing_schedule.year = data.get('academicYear', '')
            existing_schedule.semester = data.get('academicSemester', '')
            existing_schedule.work_hour_from = data.get('workHourFrom', '')
            existing_schedule.work_hour_to = data.get('workHourTo', '')
            existing_schedule.full_data = json.dumps(data, ensure_ascii=False)

            db.session.commit()
            return jsonify({"message": "✅ تم التحديث بنجاح!", "is_new": False}), 200
        else:
            # حفظ جديد
            schedule = Schedule(
                group_name=first_group_name,
                group_level=group_level,
                university=data.get('university', ''),
                faculty=data.get('specialization', ''),
                year=data.get('academicYear', ''),
                semester=data.get('academicSemester', ''),
                work_hour_from=data.get('workHourFrom', ''),
                work_hour_to=data.get('workHourTo', ''),
                full_data=json.dumps(data, ensure_ascii=False)
            )
            db.session.add(schedule)
            db.session.commit()
            return jsonify({"message": "✅ تم الحفظ بنجاح!", "is_new": True}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"❌ حدث خطأ أثناء الحفظ: {str(e)}"}), 500

@app.route('/get-schedules', methods=['GET'])
def get_schedules():
    try:
        schedules = Schedule.query.all()
        schedules_data = [{
            'id': schedule.id,
            'group_name': schedule.group_name,
            'group_level': schedule.group_level
        } for schedule in schedules]

        return jsonify(schedules_data), 200
    except Exception as e:
        return jsonify({"message": f"❌ حدث خطأ أثناء جلب الجداول: {str(e)}"}), 500

@app.route('/get-schedule/<int:schedule_id>', methods=['GET'])
def get_schedule(schedule_id):
    try:
        schedule = Schedule.query.get_or_404(schedule_id)
        schedule_data = json.loads(schedule.full_data)
        schedule_data['id'] = schedule.id
        return jsonify(schedule_data), 200
    except Exception as e:
        return jsonify({"message": f"❌ حدث خطأ أثناء جلب الجدول: {str(e)}"}), 500

@app.route('/delete-schedule/<int:schedule_id>', methods=['DELETE'])
def delete_schedule(schedule_id):
    try:
        schedule = Schedule.query.get_or_404(schedule_id)
        db.session.delete(schedule)
        db.session.commit()
        return jsonify({"message": "🗑️ تم الحذف بنجاح"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"❌ حدث خطأ أثناء الحذف: {str(e)}"}), 500

@app.route('/', methods=['GET'])
def root():
    return jsonify({"message": "🚀 Backend is running!"}), 200

# تشغيل التطبيق
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
