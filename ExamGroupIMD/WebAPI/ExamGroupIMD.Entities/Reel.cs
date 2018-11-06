using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace ExamGroupIMD.Entities
{
    [Serializable]
    [DataContract]
    public class Reel
    {
        [DataMember]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReelId { get; set; }

        [DataMember]
        [StringLength(100)]
        public string Name { get; set; }

        [DataMember]
        public string Standard { get; set; }

        [DataMember]
        public string Definition { get; set; }

        [DataMember]
        public virtual ICollection<Clip> Clips { get; set; }
    }
}
