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
        bool isOBl = Convert.ToBoolean(context.Request["isOBL"]);
        int time = Convert.ToInt32(context.Request["time"]);
        DateTime date = DateTime.Now;

        StepToWrite toWrite = new StepToWrite(caseID, step, caseType, role, isOBl, time, date);

        //string fileContent = File.ReadAllText("F:\\Dropbox\\JS\\LUT\\TimeTracker_extention-bootstrap\\data.json");//home
        string fileContent = File.ReadAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\TimeTracker_extention-bootstrap\\data.json");//work

        List<StepToWrite> collection = JsonConvert.DeserializeObject<List<StepToWrite>>(fileContent);

        collection.Add(toWrite);

        string stringToWrite = JsonConvert.SerializeObject(collection);

        //File.WriteAllText("F:\\Dropbox\\JS\\LUT\\TimeTracker_extention-bootstrap\\data.json", stringToWrite);//home
        File.WriteAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\TimeTracker_extention-bootstrap\\data.json", stringToWrite);//work

        context.Response.Write(toWrite.CaseID);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}