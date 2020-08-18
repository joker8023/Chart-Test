from sqlalchemy import func

from api.extensions import db

Column = db.Column


class CRUDMixin(object):
    @classmethod
    def create(cls, **kwargs):
        """Create a new record and save it the database."""
        instance = cls(**kwargs)
        return instance.save()

    def update(self, **kwargs):
        """Update specific fields of a record."""
        for attr, value in kwargs.iteritems():
            setattr(self, attr, value)
        db.session.update(self)
        return self

    def save(self):
        """Save the record."""
        db.session.begin()
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        """Remove the record from the database."""
        db.session.delete(self)
        return self


class Model(CRUDMixin, db.Model):
    """Base model class that includes CRUD convenience methods."""
    __abstract__ = True


class SurrogatePK(object):
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    created_at = Column(db.DateTime(), server_default=func.now(), comment="创建时间")
    updated_at = Column(db.DateTime(), server_default=db.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
                        comment="更新时间")

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}
