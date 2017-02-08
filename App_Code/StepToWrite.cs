using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Сводное описание для Class1
/// </summary>
public class StepToWrite
{
    public string CaseID { get; set; }
    public string Step { get; set; }
    public string CaseType { get; set; }
    public string Role { get; set; }
    public int Time { get; set; }
    public DateTime Date { get; set; }

    public StepToWrite(string caseID,string step, string caseType, string role, int time, DateTime date)
    {
        this.CaseID = caseID;
        this.Step = step;
        this.CaseType = caseType;
        this.Role = role;
        this.Time = time;
        this.Date = date;
    }
}