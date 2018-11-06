using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace ExamGroupIMD.Entities
{
    [Serializable]
    [DataContract]
    [ComplexType]
    public class Timecode
    {
        [DataMember]
        public int Hours { get; set; }

        [DataMember]
        public int Minutes { get; set; }

        [DataMember]
        public int Seconds { get; set; }

        [DataMember]
        public int Frames { get; set; }
    }
}
