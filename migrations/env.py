from logging.config import fileConfig
from sqlalchemy import create_engine, pool
from alembic import context
import sys
import os

# Allow relative imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db.database import Base, DATABASE_URI  # Adjust as per your structure
from db import models  # Ensure this imports all models

# Alembic config object
config = context.config

# Set DB URL (sync version for Alembic)
config.set_main_option("sqlalchemy.url", DATABASE_URI.replace("+psycopg[async]", "+psycopg"))

# Set up logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Target metadata for autogenerate support
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in offline mode."""
    context.configure(
        url=config.get_main_option("sqlalchemy.url"),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in online mode with a sync engine."""
    connectable = create_engine(
        config.get_main_option("sqlalchemy.url"),
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
