using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Model;
using Repository.Interfaces;

namespace Repository.Repositories
{
    public abstract class BaseRepository<TEntity> : IStudentRepository<TEntity>
    {
        public BaseRepository()
        {

        }

        public abstract Task Create(TEntity student);

        public abstract Task Delete(int Id);

        public abstract Task<TEntity> Get(int Id);

        public abstract Task<List<TEntity>> GetAll();

        public abstract Task Update(TEntity student);
    }
}
