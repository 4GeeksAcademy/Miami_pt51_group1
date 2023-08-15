"""empty message

Revision ID: 154d1d89b45a
Revises: 2bd4918397d2
Create Date: 2023-08-15 17:28:41.870547

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '154d1d89b45a'
down_revision = '2bd4918397d2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.drop_constraint('favorites_User_id_fkey', type_='foreignkey')
        batch_op.drop_column('User_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('User_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('favorites_User_id_fkey', 'user', ['User_id'], ['id'])

    # ### end Alembic commands ###
