<%@ WebHandler Language="C#" Class="Handler2" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Reflection;
using DBCodeFirst;

public class Handler2 : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        context.Response.AppendHeader("Access-Control-Allow-Origin", "*");


        CaseContext db = new CaseContext();

        var collection = from step in db.Cases
                             //where step.CaseID == "ME17-ZUZ-PER"
                             orderby step.Date descending
                         select step;
        string str = JsonConvert.SerializeObject(collection);

        context.Response.Write(str);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}