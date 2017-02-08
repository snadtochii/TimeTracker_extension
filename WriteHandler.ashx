<%@ WebHandler Language="C#" Class="WriteHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using Newtonsoft.Json;

public class WriteHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.AppendHeader("Access-Control-Allow-Origin", "*");

        string caseID = context.Request["caseID"];
        string step = context.Request["step"];
        string caseType = context.Request["caseType"];
        string role = context.Request["role"];
        int time = Convert.ToInt32(context.Request["time"]);
        DateTime date = DateTime.Now;

        StepToWrite toWrite = new StepToWrite(caseID, step, caseType, role, time, date);

        //string fileContent = File.ReadAllText("F:\\Dropbox\\JS\\LUT\\TimeTracker_extention\\db.json");
        string fileContent = File.ReadAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\TimeTracker_extention\\db.json");


        List<StepToWrite> collection = JsonConvert.DeserializeObject<List<StepToWrite>>(fileContent);

        collection.Add(toWrite);

        string stringToWrite = JsonConvert.SerializeObject(collection);
        //stringToWrite = JsonConvert.SerializeObject(toWrite);

        //File.WriteAllText("F:\\Dropbox\\JS\\LUT\\TimeTracker_extention\\db.json", stringToWrite);
        File.WriteAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\TimeTracker_extention\\db.json", stringToWrite);


        context.Response.Write("Hello World");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}