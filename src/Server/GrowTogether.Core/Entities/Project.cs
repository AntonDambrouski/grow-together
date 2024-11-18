﻿namespace GrowTogether.Core.Entities;

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsAiGenerated { get; set; }
    public string UserId { get; set; }
}