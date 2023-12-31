import { useEffect, useState } from 'react'
import './App.css'
import { GetMetadataFiles } from './readers/github/reader';
import { Bagel } from './visualizer/bagel';

var croiMetaHard : CroissantMetadata = JSON.parse(`{
  "@context": {
    "@vocab": "https://schema.org/",
    "sc": "https://schema.org/",
    "ml": "http://mlcommons.org/schema/",
    "wd": "https://www.wikidata.org/wiki/",
    "includes": "ml:includes",
    "recordSet": "ml:RecordSet",
    "field": "ml:Field",
    "subField": "ml:SubField",
    "dataType": "ml:dataType",
    "source": "ml:source",
    "data": "ml:data",
    "applyTransform": "ml:applyTransform",
    "format": "ml:format",
    "regex": "ml:regex",
    "separator": "ml:separator",
    "references": "ml:references"
  },
  "@type": "sc:Dataset",
  "@language": "en",
  "name": "Titanic",
  "url": "https://www.openml.org/d/40945",
  "description": "The original Titanic dataset, describing the status of individual passengers on the Titanic. The titanic data does not contain information from the crew, but it does contain actual ages of half of the passengers.  For more information about how this dataset was constructed: https://web.archive.org/web/20200802155940/http://biostat.mc.vanderbilt.edu/wiki/pub/Main/DataSets/titanic3info.txtOther useful information (useful for prices description for example):http://campus.lakeforest.edu/frank/FILES/MLFfiles/Bio150/Titanic/TitanicMETA.pdf Also see the following article describing shortcomings of the dataset data:https://emma-stiefel.medium.com/plugging-holes-in-kaggles-titanic-dataset-an-introduction-to-combining-datasets-with-fuzzywuzzy-60a686699da7",
  "license": "Public",
  "citation": "The principal source for data about Titanic passengers is the Encyclopedia Titanica (http://www.encyclopedia-titanica.org/). The datasets used here were begun by a variety of researchers. One of the original sources is Eaton & Haas (1994) Titanic: Triumph and Tragedy, Patrick Stephens Ltd, which includes a passenger list created by many researchers and edited by Michael A. Findlay.Thomas Cason of UVa has greatly updated and improved the titanic data frame using the Encyclopedia Titanica and created the dataset here. Some duplicate passengers have been dropped, many errors corrected, many missing ages filled in, and new variables created.",
  "distribution": [
    {
      "@type": "sc:FileObject",
      "name": "passengers.csv",
      "contentUrl": "https://www.openml.org/data/get_csv/16826755/phpMYEkMl",
      "contentSize": "117743 B",
      "sha256": "c617db2c7470716250f6f001be51304c76bcc8815527ab8bae734bdca0735737",
      "encodingFormat": "text/csv"
    },
    {
      "@type": "sc:FileObject",
      "name": "genders.csv",
      "description": "Maps gender values (male, female) to semantic URLs.",
      "contentUrl": "data/genders.csv",
      "contentSize": "117743 B",
      "sha256": "c617db2c7470716250f6f001be51304c76bcc8815527ab8bae734bdca0735737",
      "encodingFormat": "text/csv"
    },
    {
      "@type": "sc:FileObject",
      "name": "embarkation_ports.csv",
      "description": "Maps Embarkation port initial to labeled values.",
      "contentUrl": "data/embarkation_ports.csv",
      "contentSize": "117743 B",
      "sha256": "c617db2c7470716250f6f001be51304c76bcc8815527ab8bae734bdca0735737",
      "encodingFormat": "text/csv"
    }
  ],
  "recordSet": [
    {
      "@type": "ml:RecordSet",
      "name": "genders",
      "description": "Maps gender labels to semantic definitions.",
      "key": "#{label}",
      "field": [
        {
          "name": "label",
          "description": "One of {male, female}",
          "@type": "ml:Field",
          "dataType": [
            "sc:Text",
            "sc:name"
          ],
          "source": "#{genders.csv/label}"
        },
        {
          "name": "url",
          "description": "Corresponding WikiData URL",
          "@type": "ml:Field",
          "dataType": [
            "sc:URL",
            "wd:Q48277"
          ],
          "source": "#{genders.csv/url}"
        }
      ]
    },
    {
      "@type": "ml:RecordSet",
      "name": "embarkation_ports",
      "description": "Maps Embarkation port initial to labeled values.",
      "key": "#{key}",
      "field": [
        {
          "name": "key",
          "description": "C, Q, S or ?",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{embarkation_ports.csv/key}"
        },
        {
          "name": "label",
          "description": "Human-readable label",
          "@type": "ml:Field",
          "dataType": [
            "sc:Text",
            "sc:name"
          ],
          "source": "#{embarkation_ports.csv/label}"
        },
        {
          "name": "url",
          "description": "Corresponding WikiData URL",
          "@type": "ml:Field",
          "dataType": [
            "sc:URL",
            "wd:Q515"
          ],
          "source": "#{embarkation_ports.csv/url}"
        }
      ]
    },
    {
      "@type": "ml:RecordSet",
      "name": "passengers",
      "description": "The list of passengers. Does not include crew members.",
      "field": [
        {
          "name": "name",
          "description": "Name of the passenger",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/name}"
        },
        {
          "name": "gender",
          "description": "Gender of passenger (male or female)",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/sex}",
          "references": "#{genders/label}"
        },
        {
          "name": "age",
          "description": "Age of passenger at time of death.",
          "@type": "ml:Field",
          "dataType": "sc:Float",
          "source": "#{passengers.csv/age}"
        },
        {
          "name": "survived",
          "description": "Survival status of passenger (0: Lost, 1: Saved)",
          "@type": "ml:Field",
          "dataType": "sc:Integer",
          "source": "#{passengers.csv/survived}"
        },
        {
          "name": "pclass",
          "description": "Passenger Class (1st/2nd/3rd)",
          "@type": "ml:Field",
          "dataType": "sc:Integer",
          "source": "#{passengers.csv/pclass}"
        },
        {
          "name": "cabin",
          "description": "Passenger cabin.",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/cabin}"
        },
        {
          "name": "embarked",
          "description": "Port of Embarkation (C: Cherbourg, Q: Queenstown, S: Southampton, ?: Unknown).",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/embarked}",
          "references": "#{embarkation_ports/key}"
        },
        {
          "name": "fare",
          "description": "Passenger Fare (British pound)",
          "@type": "ml:Field",
          "dataType": "sc:Float",
          "source": "#{passengers.csv/fare}"
        },
        {
          "name": "home_destination",
          "description": "Home and destination",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/home.dest}"
        },
        {
          "name": "ticket",
          "description": "Ticket Number, may include a letter.",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/ticket}"
        },
        {
          "name": "num_parents_children",
          "description": "Number of Parents/Children Aboard",
          "@type": "ml:Field",
          "dataType": "sc:Integer",
          "source": "#{passengers.csv/parch}"
        },
        {
          "name": "num_siblings_spouses",
          "description": "Number of Siblings/Spouses Aboard",
          "@type": "ml:Field",
          "dataType": "sc:Integer",
          "source": "#{passengers.csv/sibsp}"
        },
        {
          "name": "boat",
          "description": "Lifeboat used by passenger",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/boat}"
        },
        {
          "name": "body",
          "description": "Body Identification Number",
          "@type": "ml:Field",
          "dataType": "sc:Text",
          "source": "#{passengers.csv/body}"
        }
      ]
    }
  ]
}
`)

function App() {
  const [dirs, setDirs] = useState<{[key: string]: CroissantMetadata}>({test: croiMetaHard});
  useEffect(() => {
    GetMetadataFiles().then((newDirs) => {
      setDirs(newDirs);
    });
  },[])

  return (
      <Bagel metas={dirs}/>
  )
}

export default App
