using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IStudentRepository<TEntity>
    {
        public Task<List<TEntity>> GetAll();
        public Task<TEntity> Get(int Id);
        public Task Create(TEntity student);
        public Task Update(TEntity student);
        public Task Delete(int Id);
    }
}
