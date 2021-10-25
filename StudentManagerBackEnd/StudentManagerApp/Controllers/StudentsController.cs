using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Model;
using Repository.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace StudentManagerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : Controller
    {

        private IStudentRepository<Student> studentRepository;
        private readonly ILogger<StudentsController> logger;
        private ResponseDetails<Student> responseDetails;

        public StudentsController(
            IStudentRepository<Student> studentRepository,
            ILogger<StudentsController> logger)
        {
            this.studentRepository = studentRepository;
            this.logger = logger;
            this.responseDetails = new ResponseDetails<Student>();
        }

        [HttpGet]
        [Route("getall")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var students = await this.studentRepository.GetAll();
                this.responseDetails.List = students;
                this.responseDetails.SuccessMessage = "Success";
            }
            catch (Exception ex)
            {
                this.responseDetails.SuccessMessage = "Failed";
                this.logger.LogError(ex.Message);
            }
            return Ok(JsonSerializer.Serialize(this.responseDetails));
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var student = await this.studentRepository.Get(id);
                this.responseDetails.Details = student;
                this.responseDetails.SuccessMessage = "Success";
            }
            catch (Exception ex)
            {
                this.responseDetails.SuccessMessage = "Failed";
                this.logger.LogError(ex.Message);
            }
            return Ok(JsonSerializer.Serialize(this.responseDetails));
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(Student student)
        {
            try
            {
                await this.studentRepository.Create(student);
                this.responseDetails.SuccessMessage = "Created successfully";
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
            return Ok(JsonSerializer.Serialize(this.responseDetails));
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> Update(Student student)
        {
            try
            {
                await this.studentRepository.Update(student);
                this.responseDetails.SuccessMessage = "Updated successfully";
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
            return Ok(JsonSerializer.Serialize(this.responseDetails));
        }

        [HttpGet]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await this.studentRepository.Delete(id);
                this.responseDetails.SuccessMessage = "Deleted successfully";
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex.Message);
            }
            return Ok(JsonSerializer.Serialize(this.responseDetails));
        }

        [HttpGet]
        [Route("generate-csv")]
        public async Task<IActionResult> GenerateCSV()
        {
            try
            {
                var students = await this.studentRepository.GetAll();
                this.responseDetails.List = students;
                using (Stream stream = new FileInfo(Path.Combine("Temp/download.csv")).OpenWrite())
                {
                    stream.SetLength(0);
                    using (StreamWriter writer = new StreamWriter(stream))
                    {
                        foreach (var student in students)
                        {
                            string line = student.Id + ", " + student.Username + ", " + student.FirstName + ", " + student.LastName + ", " + student.Age + ", " + student.Career;
                            writer.WriteLine(line);
                        }
                        writer.Flush();
                    }
                };
                this.responseDetails.SuccessMessage = "Completed Successfully";
            }
            catch (Exception ex)
            {
                this.responseDetails.SuccessMessage = "Operation Failed";
                this.logger.LogError(ex.Message);
            }
            return Ok(JsonSerializer.Serialize(this.responseDetails));
        }

        [HttpGet]
        [Route("download-csv")]
        public async Task<IActionResult> DownloadCSV()
        {
            try
            {
                await Task.Delay(1000);
                var csv = new FileInfo(Path.Combine("Temp/download.csv")).OpenRead();
                return File(csv, "application/msword");
            }
            catch (Exception ex)
            {
                this.responseDetails.SuccessMessage = "Operation Failed";
                this.logger.LogError(ex.Message);
                return null;
            }
        }
    }
}
