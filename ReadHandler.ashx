<%@ WebHandler Language="C#" Class="ReadHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Reflection;

public class ReadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        context.Response.AppendHeader("Access-Control-Allow-Origin", "*");

        int y = Convert.ToInt32(context.Request["y"]);
        int m = Convert.ToInt32(context.Request["m"]);
        int d = Convert.ToInt32(context.Request["d"]);
        string role = context.Request["role"];
		
        //y = 2017;
        //m = 2;
        //d = 20;
        //role ="qe";
		
        DateTime date = new DateTime(y, m, d);

        //string fileContent = File.ReadAllText("F:\\Dropbox\\JS\\LUT\\TimeTracker_extention-bootstrap\\data.json");//home
        string fileContent = File.ReadAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\TimeTracker_extention-bootstrap\\data.json");//work

        List<StepToWrite> collection = JsonConvert.DeserializeObject<List<StepToWrite>>(fileContent);
        int timeSynthes = 0;
        int timeObl = 0;
        var selection = from step in collection
                        where step.Date.Day == d && step.Date.Month == m && step.Date.Year == y && step.Role == role
                        select step;

        foreach (var step in selection)
        {
            if (step.IsOBL)
            {
                timeObl += step.Time;
                continue;
            }
            timeSynthes += step.Time;
        }

        context.Response.Write(JsonConvert.SerializeObject(new { timeSynthes = timeSynthes, timeObl = timeObl}));
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}