using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace ExamGroupIMD.Entities
{
    [Serializable]
    [DataContract]
    public class Clip
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClipId { get; set; }

        [DataMember]
        [StringLength(100)]
        public string Name { get; set; }

        [DataMember]
        [StringLength(500)]
        public string Description { get; set; }

        [DataMember]
        public string Standard { get; set; }

        [DataMember]
        public string Definition { get; set; }

        [DataMember]
        public Timecode StartTime { get; set; }

        [DataMember]
        public Timecode EndTime { get; set; }

        public ICollection<Reel> Reels { get; set; }
    }
}
