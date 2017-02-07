<%@ WebHandler Language="C#" Class="ReadHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

public class ReadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        context.Response.ContentType = "text/plain";
        context.Response.AppendHeader("Access-Control-Allow-Origin", "*");

        int y = Convert.ToInt32(context.Request["y"]);
        int m = Convert.ToInt32(context.Request["m"]);
        int d = Convert.ToInt32(context.Request["d"]);

            y = 2017;
            m = 2;
            d = 5;

        DateTime date = new DateTime(y, m, d);

        //string fileContent = File.ReadAllText("F:\\Dropbox\\JS\\LUT\\Extention\\db.json");
        string fileContent = File.ReadAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\Extention\\db.json");

        List<StepToWrite> collection = JsonConvert.DeserializeObject<List<StepToWrite>>(fileContent);

        var selection = from step in collection
                        where step.Step == "Images QC"
                        select step;
        int timeRez = 0;
        foreach (var step in selection)
        {
            timeRez += step.Time;
        }


        context.Response.Write(date.ToString("dd.MM.yyyy") + " - " + timeRez);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}