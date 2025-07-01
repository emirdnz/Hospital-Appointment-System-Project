using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital_Appointment.Entities.Abstract
{
    public class BaseEntity
    {
        public string id { get; set; } = Guid.NewGuid().ToString();

        public DateTime createdTime { get; set; } = DateTime.UtcNow;

    }
}
