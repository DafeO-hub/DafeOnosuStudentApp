using Microsoft.Extensions.Logging;
using Model;
using NUnit.Framework;
using Repository.Repositories;
using StudentManagerApp.Controllers;
using System.Threading.Tasks;

namespace StudentManagerTest
{
    public class StudentManager
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task GetAll()
        {
            MockStudentRepository repository = new MockStudentRepository(new LoggerFactory().CreateLogger<MockStudentRepository>());
            StudentsController student = new StudentsController(repository, new LoggerFactory().CreateLogger<StudentsController>());
            var result = await student.GetAll();
            Assert.Pass("");
        }

        [Test]
        public async Task Get()
        {
            MockStudentRepository repository = new MockStudentRepository(new LoggerFactory().CreateLogger<MockStudentRepository>());
            StudentsController student = new StudentsController(repository, new LoggerFactory().CreateLogger<StudentsController>());
            var result = await student.Get(1);
            Assert.Pass();
        }
    }
}