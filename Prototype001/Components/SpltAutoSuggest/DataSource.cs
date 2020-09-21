using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Prototype001.Components.SpltAutoSuggest
{
    public class DataSource
    {
        private string _url;
        private string _labelKey;
        private string _resultsKey;

        public DataSource(string url, string labelKey, string resultsKey = "")
        {
             _url = url;
             _labelKey = labelKey;
             _resultsKey = resultsKey;
        }
        
        public async Task<Dictionary<string, JToken>> Search(string keyword)
        {
             var httpClient = new HttpClient();
             var httpResponse = await httpClient.GetAsync(_url.Replace("{keyword}", keyword));

             if (httpResponse.IsSuccessStatusCode)
             {
                 var content = await httpResponse.Content.ReadAsStringAsync();
                 JObject contentObject = JObject.Parse(content);

                 List<JToken> results = null;
                 if (_resultsKey != "")
                 { 
                     results = contentObject[_resultsKey]?.Children().ToList();
                 }
                 else
                 {
                     results = contentObject.Children().ToList();
                 }

                 if (results != null)
                 {
                     var searchResults = new Dictionary<string, JToken>();
                     foreach (var result in results)
                     {
                         var label = result[_labelKey]?.ToString();
                         if (label != null)
                         {
                            searchResults.Add(label, result);
                         }
                     }

                     return searchResults;
                 }
             }

             return null;
        }
    }
}