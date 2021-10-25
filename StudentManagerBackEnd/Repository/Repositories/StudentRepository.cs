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
    public class StudentRepository : BaseRepository<Student>
    {
        private readonly ILogger<StudentRepository> logger;
        private string connectionString;

        public StudentRepository(ILogger<StudentRepository> logger)
        {
            this.logger = logger;

            try
            {
                this.connectionString = "DataSource=" + Path.Combine("sample.db3");
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
        }

        public async override Task Create(Student student)
        {
            try
            {
                using (var connection = new SQLiteConnection(this.connectionString))
                {
                    connection.Open();
                    string myInsertQuery = "INSERT INTO Student(Id, Username, FirstName, LastName, Age, Career) VALUES (@Id, @Username, @FirstName, @LastName, @Age, @Career)";
                    SQLiteCommand sqCommand = new SQLiteCommand(myInsertQuery);
                    sqCommand.Connection = connection;
                    sqCommand.Parameters.AddWithValue("@Id", student.Id);
                    sqCommand.Parameters.AddWithValue("@Username", student.Username);
                    sqCommand.Parameters.AddWithValue("@FirstName", student.FirstName);
                    sqCommand.Parameters.AddWithValue("@LastName", student.LastName);
                    sqCommand.Parameters.AddWithValue("@Age", student.Age);
                    sqCommand.Parameters.AddWithValue("@Career", student.Career);
                    sqCommand.Prepare();
                    sqCommand.ExecuteNonQuery();
                }
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
                using (var connection = new SQLiteConnection(this.connectionString))
                {
                    connection.Open();
                    string myInsertQuery = "UPDATE Student SET Username=@Username, FirstName=@FirstName, LastName=@LastName, Age=@Age, Career=@Career WHERE Id=@Id";
                    SQLiteCommand sqCommand = new SQLiteCommand(myInsertQuery);
                    sqCommand.Connection = connection;
                    sqCommand.Parameters.AddWithValue("@Id", student.Id);
                    sqCommand.Parameters.AddWithValue("@Username", student.Username);
                    sqCommand.Parameters.AddWithValue("@FirstName", student.FirstName);
                    sqCommand.Parameters.AddWithValue("@LastName", student.LastName);
                    sqCommand.Parameters.AddWithValue("@Age", student.Age);
                    sqCommand.Parameters.AddWithValue("@Career", student.Career);
                    sqCommand.Prepare();
                    sqCommand.ExecuteNonQuery();
                }
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
                using (var connection = new SQLiteConnection(this.connectionString))
                {
                    connection.Open();
                    string myInsertQuery = "DELETE FROM Student WHERE Id=@Id";
                    SQLiteCommand sqCommand = new SQLiteCommand(myInsertQuery);
                    sqCommand.Connection = connection;
                    sqCommand.Parameters.AddWithValue("@Id", Id);
                    sqCommand.Prepare();
                    sqCommand.ExecuteNonQuery();
                }
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
                Student student = new Student();
                using (var connection = new SQLiteConnection(this.connectionString))
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText =
                    @"SELECT *
                      FROM Student
                      WHERE Id = $id
                    ";
                    command.Parameters.AddWithValue("$id", Id);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            student.Id = reader.GetInt32(0);
                            student.Username = reader.GetString(1);
                            student.FirstName = reader.GetString(2);
                            student.LastName = reader.GetString(3);
                            student.Age = reader.GetInt32(4);
                            student.Career = reader.GetString(5);
                        }
                    }
                }
                return student;
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
                List<Student> students = new List<Student>();
                using (var connection = new SQLiteConnection(this.connectionString))
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText =
                    @"SELECT * FROM Student";
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            students.Add(new Student()
                            {
                                Id = reader.GetInt32(0),
                                Username = reader.GetString(1),
                                FirstName = reader.GetString(2),
                                LastName = reader.GetString(3),
                                Age = reader.GetInt32(4),
                                Career = reader.GetString(5)
                            });
                        }
                    }
                }
                return students;

                //await Task.Delay(1000);
                //return new List<Student>()
                //{
                //    new Student()
                //    {
                //        Id = 1,
                //        FirstName = "Dafe",
                //        LastName = "Onosu",
                //        Age = 67,
                //        Career = "Solution Architect",
                //    },
                //    new Student()
                //    {
                //        Id = 2,
                //        FirstName = "Bobby",
                //        LastName = "Aiwekhoe",
                //        Age = 16,
                //        Career = "Software Developer",
                //    },
                //    new Student()
                //    {
                //        Id = 3,
                //        FirstName = "Kelly",
                //        LastName = "Audu",
                //        Age = 35,
                //        Career = "Frontend Node.Js Developer",
                //    }
                //};
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
                return null;
            }
        }
    }
}
