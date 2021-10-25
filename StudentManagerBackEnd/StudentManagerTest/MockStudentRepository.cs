using Microsoft.Extensions.Logging;
using Model;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class MockStudentRepository : BaseRepository<Student>
    {
        private readonly ILogger<MockStudentRepository> logger;
        private string connectionString;

        public MockStudentRepository(ILogger<MockStudentRepository> logger)
        {
            this.logger = logger;
        }

        public async override Task Create(Student student)
        {
            try
            {
                await Task.Delay(1000);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public async override Task Update(Student student)
        {
            try
            {
                await Task.Delay(1000);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public async override Task Delete(int Id)
        {
            try
            {
                await Task.Delay(1000);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public async override Task<Student> Get(int Id)
        {
            try
            {
                await Task.Delay(1000);
                return new Student()
                {
                    Id = 1,
                    FirstName = "Dafe",
                    LastName = "Onosu",
                    Age = 67,
                    Career = "Solution Architect",
                };
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }

        public async override Task<List<Student>> GetAll()
        {
            try
            {
                await Task.Delay(1000);
                return new List<Student>()
                {
                    new Student()
                    {
                        Id = 1,
                        FirstName = "Dafe",
                        LastName = "Onosu",
                        Age = 67,
                        Career = "Solution Architect",
                    },
                    new Student()
                    {
                        Id = 2,
                        FirstName = "Ben",
                        LastName = "Olaleye",
                        Age = 16,
                        Career = "Software Developer",
                    },
                    new Student()
                    {
                        Id = 3,
                        FirstName = "Kelly",
                        LastName = "Audu",
                        Age = 35,
                        Career = "Frontend Node.Js Developer",
                    }
                };
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }
    }
}
