using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DBCodeFirst
{
    public class Case
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string CaseID { get; set; }
        public string Step { get; set; }
        public string CaseType { get; set; }
        public string Role { get; set; }
        public int Time { get; set; }
        public DateTime Date { get; set; }
        public bool IsOBL { get; set; }
    }
}
