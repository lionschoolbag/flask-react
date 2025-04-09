from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from datetime import datetime

# 初始化 Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化数据库
db = SQLAlchemy(app)

# 定义 User 模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.username}>'

# 初始化数据库并插入一个用户
def init_db():
    with app.app_context():
        db.create_all()
        print("✅ 数据库和表已初始化")

        # 插入一个用户（如果不存在）
        username = "testuser"
        password = "123456"

        if not User.query.filter_by(username=username).first():
            user = User(username=username, password_hash=generate_password_hash(password))
            db.session.add(user)
            db.session.commit()
            print(f"✅ 插入测试用户：{username}")
        else:
            print(f"⚠️ 用户 {username} 已存在，跳过插入")

        # 查询所有用户
        users = User.query.all()
        print("📋 当前用户列表：")
        for u in users:
            print(f"- {u.username}")

if __name__ == '__main__':
    init_db()
