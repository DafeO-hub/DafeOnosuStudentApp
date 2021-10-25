using System;
using System.Collections.Generic;

namespace Model
{
    public interface IResponseDetails<TEntity>
    {
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }
        public List<TEntity> List { get; set; }
        public TEntity Details { get; set; }
    }
    public class ResponseDetails<TEntity> : IResponseDetails<TEntity>
    {
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }
        public List<TEntity> List { get; set; }
        public TEntity Details { get; set; }
    }
}
