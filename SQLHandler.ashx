<%@ WebHandler Language="C#" Class="SQLHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Reflection;
using DBCodeFirst;

public class SQLHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.AppendHeader("Access-Control-Allow-Origin", "*");

        string caseID = context.Request["caseID"];
        string step = context.Request["step"];
        string caseType = context.Request["caseType"];
        string role = context.Request["role"];
        bool isOBl = Convert.ToBoolean(context.Request["isOBL"]);
        int time = Convert.ToInt32(context.Request["time"]);
        DateTime date = DateTime.Now;

        Case toWrite = new Case
        {
            CaseID = caseID,
            Step = step,
            CaseType = caseType,
            Role = role,
            IsOBL = isOBl,
            Time = time,
            Date = date
        };
        CaseContext caseContext = new CaseContext();
        caseContext.Cases.Add(toWrite);
        caseContext.SaveChanges();
        DateTime today = DateTime.Now;
        var selection = from c in caseContext.Cases
                        where c.Date.Day == today.Day && c.Date.Month == today.Month && c.Date.Year == today.Year
                        select c;
        int output = 0;
        foreach (var item in selection)
        {
            output += item.Time;
        }
        context.Response.Write(output);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}