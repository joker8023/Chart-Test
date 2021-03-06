"""empty message

Revision ID: 43f65d69e510
Revises: 
Create Date: 2020-08-18 15:00:17.414313

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43f65d69e510'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('table1',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True, comment='创建时间'),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), nullable=True, comment='更新时间'),
    sa.Column('x', sa.String(length=16), nullable=True, comment='x'),
    sa.Column('y', sa.Numeric(precision=7, scale=2), nullable=True, comment='x'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('table2',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True, comment='创建时间'),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), nullable=True, comment='更新时间'),
    sa.Column('x', sa.String(length=16), nullable=True, comment='x'),
    sa.Column('y', sa.Numeric(precision=7, scale=2), nullable=True, comment='x'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('table2')
    op.drop_table('table1')
    # ### end Alembic commands ###
