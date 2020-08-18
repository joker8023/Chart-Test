from sqlalchemy import Column

from api.database import SurrogatePK, Model
from api.extensions import db


class Table1(SurrogatePK, Model):
    __tablename__ = 'table1'
    x = Column(db.String(16), comment="x")
    y = Column(db.Numeric(7, 2), comment="x")


class Table2(SurrogatePK, Model):
    __tablename__ = 'table2'
    x = Column(db.String(16), comment="x")
    y = Column(db.Numeric(7, 2), comment="x")
