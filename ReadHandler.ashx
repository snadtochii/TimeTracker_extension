<%@ WebHandler Language="C#" Class="ReadHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

public class ReadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.AppendHeader("Access-Control-Allow-Origin", "*");

        int y = Convert.ToInt32(context.Request["y"]);
        int m = Convert.ToInt32(context.Request["m"]);
        int d = Convert.ToInt32(context.Request["d"]);
        string role = context.Request["role"];


        DateTime date = new DateTime(y, m, d);

        //string fileContent = File.ReadAllText("F:\\Dropbox\\JS\\LUT\\TimeTracker_extention\\db.json");
        string fileContent = File.ReadAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\TimeTracker_extention\\db.json");

        List<StepToWrite> collection = JsonConvert.DeserializeObject<List<StepToWrite>>(fileContent);

        var selection = from step in collection
                        where step.Date.Day == d && step.Date.Month == m && step.Date.Year == y && step.Role == role
                        select step;
        int timeRez = 0;
        foreach (var step in selection)
        {
            timeRez += step.Time;
        }
        //date.ToString("dd.MM.yyyy")
        context.Response.Write(timeRez);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}